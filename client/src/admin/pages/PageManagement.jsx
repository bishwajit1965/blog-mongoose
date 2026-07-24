import {
  LucideArchiveX,
  LucideRefreshCcwDot,
  LucideTable,
  LucideTrash,
} from "lucide-react";
import AdminSubTitle from "../adminComponent/adminSubTitle/AdminSubTitle";
import useAdminPage from "../adminHooks/useAdminPage";
import PageForm from "./components/PageForm";
import PageTable from "./components/PageTable";
import { useState } from "react";
import {
  createPage,
  hardDeletePage,
  restorePage,
  softDeletePage,
  updatePage,
} from "../adminServices/AdminPageService";
import {
  notifyError,
  notifySuccess,
} from "../adminComponent/adminToastNotification/AdminToastNotification";
import { LucideIcon } from "../lib/LucideIcons";
import useValidator from "../../hooks/useValidator";
import pageValidationRules from "./components/pageValidationRules";
import ConfirmDialogue from "../ui/ConfirmDialogue";
import useAdminAuth from "../adminHooks/useAdminAuth";
import Modal from "../ui/Modal";
import PageView from "./PageView";
import PageTrash from "./PageTrash";
import AdminPagination from "../adminComponent/adminPagination/AdminPagination";
import CountBadge from "../ui/CountBadge";
import SearchInput from "../adminComponent/searchInput/SearchInput";

const PageManagement = () => {
  const [loading, setLoading] = useState(false);
  const { adminData, hasPermission } = useAdminAuth();
  const {
    pages,
    softDeletedPages,
    fetchPages,
    addPageToState,
    updatePageToState,
    restorePageToState,
    removePageFromState,
  } = useAdminPage();

  // Select page view state
  const [viewPage, setViewPage] = useState(null);

  // Select page to edit state
  const [selectedEditPage, setSelectedEditPage] = useState(null);

  // Soft delete page select state
  const [selectedSoftDelete, setSelectedSoftDelete] = useState(null);

  // Restore soft-deleted page select state
  const [selectRestoreSoftDeletedPage, setSelectRestoreSoftDeletedPage] =
    useState(null);

  // Hard delete page select state
  const [hardDelete, setHardDelete] = useState(null);

  const initialPageState = {
    title: "",
    slug: "",
    content: "",
    seoTitle: "",
    seoDescription: "",
    status: "",
    pageType: "",
  };
  // Pagination state
  const [paginatedData, setPaginatedData] = useState(pages || []);

  const [pageForm, setPageForm] = useState(initialPageState);

  const handleSetFormEmpty = () => {
    setSelectedEditPage(null);
    setPageForm(initialPageState);
  };

  const handleSelectPageEdit = (page) => {
    setSelectedEditPage(page);
    setPageForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      status: page.status,
      pageType: page.pageType,
    });
  };

  /*** -----> Validator integration -----> */
  const { errors, validate } = useValidator(pageValidationRules, {
    title: pageForm?.title,
    slug: pageForm?.slug,
    content: pageForm?.content,
    seoTitle: pageForm?.seoTitle,
    seoDescription: pageForm?.seoDescription,
    status: pageForm?.status,
    pageType: pageForm?.pageType,
  });

  const handleCancelPageEdit = (e) => {
    e.preventDefault();
    setSelectedEditPage(null);
    handleSetFormEmpty();
  };

  const handlePageStateChange = (e) => {
    setPageForm({
      ...pageForm,
      [e.target.name]: e.target.value,
    });
  };

  // Create / Update handler
  const handlePageSubmit = async (e) => {
    try {
      e.preventDefault();
      true;
      setLoading(true);
      if (!validate()) return;
      if (selectedEditPage) {
        const updatedPage = await updatePage(selectedEditPage?._id, pageForm);
        updatePageToState(updatedPage?.page);
        handleSetFormEmpty();
        notifySuccess("Page updated successfully!");
        fetchPages();
      } else {
        const newPage = await createPage(pageForm);
        await addPageToState(newPage);
        updatePageToState(newPage?.page);
        handleSetFormEmpty();
        notifySuccess("Page created successfully!");
        fetchPages();
      }
    } catch (error) {
      console.error("Error in updating permission", error);
      notifyError("Error in updating permission");
    } finally {
      setLoading(false);
    }
  };

  // Select page view on modal
  const handleSelectPageView = (page) => {
    setViewPage(page);
  };

  // Cancel page view on modal
  const handleCancelPageView = () => {
    setViewPage(null);
  };

  // Select page for soft-delete
  const handleSelectSoftDelete = (page) => {
    const selectedPage = pages?.find(
      (p) => p?._id.toString() === page?._id.toString(),
    );
    if (selectedPage) setSelectedSoftDelete(selectedPage);
  };

  // Soft-delete page
  const handleSoftDelete = async (id) => {
    try {
      setLoading(true);
      if (hasPermission("soft-delete-page")) {
        const response = await softDeletePage(id);
        if (response.success) {
          notifySuccess(response?.message);
          setSelectedSoftDelete(null);

          restorePageToState(response?.page);
          removePageFromState(response?.page?._id);
          fetchPages();
        }
      }
    } catch (error) {
      console.error("Error in soft-deleting page", error);
      notifyError("Error in soft-deleting page");
    } finally {
      setLoading(false);
    }
  };

  // Select soft-deleted/archived page to restore
  const handleSelectSoftDeletedPage = (page) => {
    const softDeletedPage = softDeletedPages?.find(
      (p) => p?._id.toString() === page?._id.toString(),
    );
    if (softDeletedPage) setSelectRestoreSoftDeletedPage(softDeletedPage);
  };

  // Restore soft-deleted/archived page handler
  const restoreArchivedPage = async (id) => {
    try {
      setLoading(true);
      if (hasPermission("restore-archived-page")) {
        const response = await restorePage(id);
        if (response.success) {
          notifySuccess(response?.message);
          restorePageToState(response?.page);
          setSelectRestoreSoftDeletedPage(null);
          fetchPages();
        }
      }
    } catch (error) {
      console.error("Error in restoring page", error);
      notifyError("Error in restoring page");
    } finally {
      setLoading(false);
    }
  };

  // select page to hard/permanent-delete
  const selectPageHardDelete = (page) => {
    const hardDeletablePage = softDeletedPages?.find(
      (p) => p?._id.toString() === page?._id.toString(),
    );
    if (hardDeletablePage) setHardDelete(hardDeletablePage);
  };

  // Hard-delete handler
  const handleHardDelete = async (id) => {
    try {
      setLoading(true);
      if (hasPermission("permanent-delete-page")) {
        const response = await hardDeletePage(id);
        if (response.success) {
          notifySuccess(response?.message);
          setHardDelete(null);
          removePageFromState(response?.page?._id);
          fetchPages();
        }
      }
    } catch (error) {
      console.error("Error in hard deleting page.", error);
      notifyError("Error in hard deleting page.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminSubTitle
        subTitle="Manage"
        decoratedText="Pages"
        dataLength={pages?.length ? pages?.length : 0}
      />

      <div className="p-4">
        <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-6 gap-2 mb-2">
          <div className="lg:col-span-4 cols-span-12">
            <h1 className="lg:text-xl text-lg font-bold flex items-center gap-2">
              {selectedEditPage ? (
                <LucideIcon.Edit size={20} />
              ) : (
                <LucideIcon.UploadCloud size={20} />
              )}
              {selectedEditPage
                ? `${adminData?.user?.name} • Update Page`
                : `${adminData?.user?.name} • Create Page`}
            </h1>
          </div>
          <div className="lg:col-span-8 cols-span-12">
            <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-6 gap-2">
              <div className="lg:col-span-6 col-span-12">
                <h1 className="lg:text-xl text-lg font-bold flex items-center gap-2">
                  <LucideTable size={20} /> Pages Table
                  <CountBadge dataLength={pages?.length ? pages?.length : 0} />
                </h1>
              </div>
              <div className="lg:col-span-6 col-span-12">
                <SearchInput
                  data={pages}
                  onFilteredDataChange={setPaginatedData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-6 gap-2">
          <div className="lg:col-span-4 cols-span-12 rounded-xl">
            <PageForm
              onCancel={handleCancelPageEdit}
              pageForm={pageForm}
              onSelectEditPage={selectedEditPage}
              onHandleChange={handlePageStateChange}
              onPageSubmit={handlePageSubmit}
              errors={errors}
              setPageForm={setPageForm}
            />
          </div>
          <div className="lg:col-span-8 cols-span-12 lg:space-y-6 space-y-4">
            <PageTable
              loading={loading}
              pages={paginatedData}
              fetchPages={fetchPages}
              onView={handleSelectPageView}
              handleSelectPageEdit={handleSelectPageEdit}
              onPageSubmit={handlePageSubmit}
              onSelectSoftDelete={handleSelectSoftDelete}
            />

            {/* Pagination */}
            <AdminPagination
              items={pages}
              onPaginatedDataChange={setPaginatedData} // Directly update paginated data
            />

            <div className="divider"></div>
            <div className="lg:col-span-6 cols-span-12">
              <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lag:gap-4 gap-2">
                <div className="lg:col-span-6 col-span-12">
                  <h1 className="lg:text-xl text-lg font-bold flex items-center gap-2">
                    <LucideTable size={20} />
                    Archived Pages Table
                    <CountBadge
                      dataLength={
                        softDeletedPages?.length ? softDeletedPages?.length : 0
                      }
                    />
                  </h1>
                </div>
                <div className="lg:col-span-6 col-span-12"></div>
              </div>
            </div>

            {/* Soft deleted pages table */}
            <PageTrash
              loading={loading}
              softDeletedPages={softDeletedPages}
              onView={handleSelectPageView}
              onSelectRestore={handleSelectSoftDeletedPage}
              onSelectPageHardDelete={selectPageHardDelete}
            />
          </div>
        </div>

        {/* View page confirm dialogue  */}
        {viewPage && (
          <Modal
            isOpen={viewPage}
            onClose={() => setViewPage(null)}
            title={viewPage?.title}
          >
            <PageView
              viewPage={viewPage}
              handleCancelView={handleCancelPageView}
            />
          </Modal>
        )}

        {/* Soft delete page confirm dialogue */}
        {selectedSoftDelete && (
          <ConfirmDialogue
            isOpen={selectedSoftDelete}
            onClose={() => setSelectedSoftDelete(null)}
            onConfirm={() => handleSoftDelete(selectedSoftDelete?._id)}
            loading={loading}
            title="Soft Delete Page"
            message="Soft delete this page?"
            confirmIcon={LucideArchiveX}
            confirmText="Soft Delete"
            confirmLoadingText="Soft deleting..."
            variant="success"
          />
        )}

        {/* Restore soft-deleted/archived page confirm dialogue */}
        {selectRestoreSoftDeletedPage && (
          <ConfirmDialogue
            isOpen={selectRestoreSoftDeletedPage}
            onClose={() => setSelectRestoreSoftDeletedPage(null)}
            onConfirm={() =>
              restoreArchivedPage(selectRestoreSoftDeletedPage?._id)
            }
            loading={loading}
            title="Restore Page"
            message="Restore this page?"
            confirmIcon={LucideRefreshCcwDot}
            confirmText="Restore Archived"
            confirmLoadingText="Restoring..."
            variant="success"
          />
        )}

        {/* Hard delete confirm dialogue */}
        {hardDelete && (
          <ConfirmDialogue
            isOpen={hardDelete}
            onClose={() => setHardDelete(null)}
            onConfirm={() => handleHardDelete(hardDelete?._id)}
            loading={loading}
            title="Hard Delete Page"
            message="Delete this page?"
            confirmIcon={LucideTrash}
            confirmText="Delete Page"
            confirmLoadingText="Deleting..."
            variant="danger"
          />
        )}
      </div>
    </div>
  );
};

export default PageManagement;
