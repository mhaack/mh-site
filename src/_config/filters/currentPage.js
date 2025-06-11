export const currentPage = (allPages, currentPage) => {
    const matches = allPages.filter((page) => page.inputPath === currentPage.inputPath);
    if (matches && matches.length) {
        return matches[0];
    }
    return null;
};
