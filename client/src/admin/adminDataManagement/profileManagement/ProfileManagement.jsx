import {
  getAllProfiles,
  updateProfile,
} from "../../adminServices/profileService";
import { useCallback, useEffect, useState } from "react";

import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import { Helmet } from "react-helmet-async";
import ProfileData from "./ProfileData";
import ProfileTable from "./ProfileTable";
import ProfileUpdateForm from "./ProfileUpdateForm";

const ProfileManagement = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [mode, setMode] = useState("form"); // "form" (default) | "edit" | "view"
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllProfiles();
      setProfiles(response);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      setError("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setIsEditing(true);
  };

  const handleView = (profile) => {
    setSelectedProfile(profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedProfile(null); // Hides the ProfileData component
    setIsEditing(false); // Ensures edit mode is off
  };

  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const response = await updateProfile(selectedProfile._id, updatedProfile);
      setProfiles(
        profiles.map((profile) =>
          profile._id === selectedProfile._id ? response : profile
        )
      );
      setSelectedProfile(response.data);
      setIsEditing(false);
      setError("");
      // Refetch updated profiles from the server
      fetchProfiles();
    } catch (err) {
      setError("Error updating profile: " + err);
    }
  };

  return (
    <div className="">
      <Helmet>
        <title>Blog || Manage Users Roles</title>
      </Helmet>
      <AdminSubTitle
        dataLength={profiles?.length ? profiles.length : 0}
        subTitle="Manage"
        decoratedText="Users Profile"
      />
      {loading && <AdminLoader />}
      <div className="p-2">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-2 gap-4">
            <div className="lg:col-span-6 col-span-12 lg:border-r dark:border-gray-700 lg:pr-3">
              {error && <p className="text-red-500">{error}</p>}
              {selectedProfile && (
                <>
                  {isEditing ? (
                    <ProfileUpdateForm
                      profile={selectedProfile}
                      isEditing={isEditing}
                      onUpdate={handleProfileUpdate}
                      onCancel={handleCancel}
                    />
                  ) : (
                    <ProfileData
                      profile={selectedProfile}
                      onEdit={() => setIsEditing(true)}
                      onCancel={handleCancel}
                    />
                  )}
                </>
              )}
            </div>

            <div className="lg:col-span-6 col-span-12">
              <h2 className="text-xl font-semibold mb-2">
                Existing Users Profiles
              </h2>
              <ProfileTable
                profiles={profiles}
                onView={handleView}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
