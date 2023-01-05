import 'styles.css'
import {StryctMode } from 'react'
import{ createRoot } from 'react-dom'
import App from './App'

const root = createRoot(document.getElementById('root'))

root.render(
    <StryctMode>
        <App/>
    </StryctMode>
)