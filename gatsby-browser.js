/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  return true;
}

exports.onRouteUpdate = ({ location, prevLocation }) => {
  const inMobile = window.innerWidth < 992;
  const scrollValue = inMobile ? 400 : 320;
  if (location.pathname.includes('blog') || location.pathname.includes('search')){
    setTimeout(() => {
      window.scrollTo({
        top: scrollValue,
        behavior: "smooth",
      })
    }, 0)
  }
  console.log('old pathname', prevLocation ? prevLocation.pathname : null)
}
