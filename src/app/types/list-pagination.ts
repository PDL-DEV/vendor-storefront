export type ListPagination<T> = {
    items: T[];
    current_page: number;
    qtd_pages: number;
    total: number;
};
