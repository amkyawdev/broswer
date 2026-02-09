const SEARCH_ENGINES = {
  google: {
    name: 'Google',
    placeholder: 'Google တွင် ရှာဖွေပါ...',
    url: 'https://www.google.com/search?q='
  },
  youtube: {
    name: 'YouTube',
    placeholder: 'YouTube တွင် ရှာဖွေပါ...',
    url: 'https://www.youtube.com/results?search_query='
  }
}

export function useSearch() {
  const currentEngine = 'google'
  const placeholder = SEARCH_ENGINES[currentEngine].placeholder

  const performSearch = (query) => {
    const encodedQuery = encodeURIComponent(query)
    const searchUrl = SEARCH_ENGINES[currentEngine].url + encodedQuery
    window.open(searchUrl, '_blank')
  }

  return {
    placeholder,
    performSearch
  }
}