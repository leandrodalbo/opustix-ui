const imgService = (uri: string, isMain?: boolean) => {
  if (uri !== "test-banner") {
    return uri;
  }

  if (isMain) {
    return "/mainBanner.jpg";
  }

  return "/secondaryBanner.jpg";
};

export default imgService;
