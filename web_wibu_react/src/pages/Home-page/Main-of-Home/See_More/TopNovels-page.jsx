import NovelListPage from '../../../../components/NovelListPage/NovelListPage';

const TopNovelsPage = () => {
  return (
    <NovelListPage
      title="Top Truyện"
      showTabs={true}
      sortFn={(novels) => {
        return [...novels].sort((a, b) => b["Số lượt xem"] - a["Số lượt xem"]);
      }}
    />
  );
};

export default TopNovelsPage;