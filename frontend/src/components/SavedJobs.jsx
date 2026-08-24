import React, { useEffect, useState } from "react";
import axios from "axios";
import Job from "./Job";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/saved/", {
          withCredentials: true,
        });

        console.log("Saved Jobs:", res.data);

        setSavedJobs(res.data.savedJobs || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading saved jobs...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h1 className="font-bold text-2xl mb-8">
        Saved Jobs ({savedJobs.length})
      </h1>

      {savedJobs.length === 0 ? (
        <p className="text-gray-500">You haven't saved any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {savedJobs.map((savedJob) => (
            <Job key={savedJob._id} job={savedJob.job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
