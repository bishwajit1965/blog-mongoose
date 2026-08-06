const FeatureSettings = ({ formData, handleFeatureChange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4 border dark:border-gray-700 dark:bg-gray-800">
      <h1 className="lg:text-2xl text-lg font-bold">⚙️ Feature Settings</h1>

      <div className="space-y-4">
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-2 dark:bg-gray-800 dark:border-gray-700">
          <legend className="fieldset-legend">Comments Enabled</legend>
          <label className="label">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox"
              name="commentsEnabled"
              checked={formData?.features?.commentsEnabled}
              onChange={handleFeatureChange}
            />
            Comments Enabled
          </label>
        </fieldset>

        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-2 dark:bg-gray-800 dark:border-gray-700">
          <legend className="fieldset-legend">Maintenance Mode</legend>
          <label className="label">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox"
              name="maintenanceMode"
              checked={formData?.features?.maintenanceMode}
              onChange={handleFeatureChange}
            />
            Maintenance Mode
          </label>
        </fieldset>

        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-2 dark:bg-gray-800 dark:border-gray-700">
          <legend className="fieldset-legend">Newsletter Enabled</legend>
          <label className="label">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox"
              name="newsletterEnabled"
              checked={formData?.features?.newsletterEnabled}
              onChange={handleFeatureChange}
            />
            Newsletter Enabled
          </label>
        </fieldset>

        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-2 dark:bg-gray-800 dark:border-gray-700">
          <legend className="fieldset-legend">User Registration Enabled</legend>
          <label className="label">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox"
              name="registrationEnabled"
              checked={formData?.features?.registrationEnabled}
              onChange={handleFeatureChange}
            />
            User Registration Enabled
          </label>
        </fieldset>
      </div>
    </div>
  );
};

export default FeatureSettings;
