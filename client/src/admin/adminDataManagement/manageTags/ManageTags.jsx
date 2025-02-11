import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaTimesCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import TagForm from "./TagForm";
import TagsTable from "./TagsTable";
import useAdminTag from "../../adminHooks/useAdminTag";
import { useState } from "react";

const ManageTags = () => {
  const { tags, fetchTags, loading } = useAdminTag();

  const [editingTag, setEditingTag] = useState(null);

  const handleEdit = (tag) => {
    setEditingTag(tag);
  };
  const handleCancelEdit = () => {
    setEditingTag(null);
  };

  return (
    <div>
      <Helmet>
        <title>Blog || Manage Tags</title>
      </Helmet>
      <AdminSubTitle
        dataLength={tags.length}
        subTitle="Manage"
        decoratedText="Tags"
      />
      <div className="p-2">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-2 gap-4">
            <div className="lg:col-span-6 col-span-12 lg:border-r dark:border-gray-700 lg:pr-3">
              <h2 className="text-xl font-semibold mb-2">
                {editingTag ? "Update Tag" : "Add Tag"}
              </h2>
              <TagForm
                onSuccess={() => {
                  fetchTags(); //Not needed as dynamic update works
                  handleCancelEdit();
                }}
                existingTag={editingTag}
              />

              {editingTag && (
                <div className="lg:mt-[-40px] lg:pl-[130px]">
                  <CTAButton
                    onClick={handleCancelEdit}
                    label="Cancel Edit"
                    className="btn btn-sm mt-2"
                    variant="warning"
                    icon={<FaTimesCircle />}
                  />
                </div>
              )}
            </div>
            <div className="lg:col-span-6 col-span-12">
              <h2 className="text-xl font-semibold mb-2">
                Existing Categories
              </h2>
              {loading ? (
                <AdminLoader />
              ) : (
                <TagsTable
                  tags={tags}
                  onEdit={handleEdit}
                  onDelete={fetchTags} // Handles deletion and reload
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTags;
