import { ArticleCard, FilterForm, Show } from "@components/index";
import MainLayout from "./layouts";
import { FilterProvider, useFilterContext } from "@context/list-article";

function App() {
  return (
    <MainLayout>
      <FilterProvider>
        <FilterForm />

        <ProductList />
      </FilterProvider>
    </MainLayout>
  );
}

const ProductList = () => {
  const { results, loading } = useFilterContext();
  return (
    <div className="article-list">
      <Show when={!loading} fallback={<p>Đang tải...</p>}>
        <Show
          when={results.length !== 0}
          fallback={<p>Không có kết quả cho bộ lọc này.</p>}
        >
          {results.map((article, key) => (
            <ArticleCard key={key} {...article} />
          ))}
        </Show>
      </Show>
    </div>
  );
};

export default App;
