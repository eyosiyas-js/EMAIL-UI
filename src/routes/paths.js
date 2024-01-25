// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = '/';

// ----------------------------------------------------------------------

export const PATH_PAGE = {
  page404: '/404'
};

export const PATH_DASHBOARD = {
  root: ROOTS,

  mail: {
    root: path(ROOTS, '/'),
    all: path(ROOTS, '/all')
  }
};
