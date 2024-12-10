import NovelListPage from '../../../../components/NovelListPage/NovelListPage';

const RecentlyUpdatedPage = () => {
  return (
    <NovelListPage
      title="Mới Cập Nhật"
      sortFn={(novels) => {
        return [...novels].sort((a, b) => {
          const dateA = new Date(a["Năm cập nhật cuối"], a["Tháng cập nhật cuối"] - 1, a["Ngày cập nhật cuối"]);
          const dateB = new Date(b["Năm cập nhật cuối"], b["Tháng cập nhật cuối"] - 1, b["Ngày cập nhật cuối"]);
          return dateB - dateA;
        });
      }}
    />
  );
};

export default RecentlyUpdatedPage;