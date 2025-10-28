const slugify = (str) =>
  str
    ?.trim()
    ?.toLowerCase()
    ?.replace(/\s+/g, '-') 
    ?.replace(/[^\w\u0980-\u09FF\-]+/g, '') // 
    ?.replace(/\-\-+/g, '-')
    ?.replace(/^-+|-+$/g, '') || '';export default slugify;