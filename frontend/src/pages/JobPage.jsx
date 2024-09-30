import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";  

const JobPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const deleteJob = async () => {
        try {
            const res = await axios.delete(`/jobs/${id}`);
            if (!res.ok) {
                throw new Error("Error deleting job");
            } 
        } catch (error) {
            console.error("Error deleting job", error);
        }
    }

    useEffect(() => {
        const fetchJob =async () => {
            try {
                const res = await axios.get(`/jobs/${id}`);
                if (!res.ok) {
                    throw new Error("Error fetching job");
                }
                setJob(res.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchJob();

    }, [id]);

    const onDeleteClick = (jobId) => {
        const confirm = window.confirm(
            "Are you sure you want to delete this job?" + jobId
        );
        if (!confirm) {
            return;
        }

        deleteJob();    
        navigate("/");
    };

    return (
        <div className="job-preview">
            {loading ? (
                <p>Loading Jobs...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <h2>{job.title}</h2>
                    <p>Type: {job.type}</p>
                    <p>Description: {job.description}</p>
                    <p>Company: {job.company.name}</p>
                    <button onClick={() => onDeleteClick(job._id)}>Delete</button>
                </>
            )}
        </div>
    )
}

export default JobPage; 