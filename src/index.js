import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import MovieApp from './components/movie-app/movie-app'

const root = createRoot(document.querySelector('.movieApp'))
root.render(<MovieApp />)
