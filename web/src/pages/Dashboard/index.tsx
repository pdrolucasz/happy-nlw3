import React from 'react'

import Sidebar from '../../components/Sidebar'
import './styles.css'

const Dashboard: React.FC = () => {
    return(
        <div id="page-dashboard">
            <Sidebar dashboard={true} />
            <main>
                <header>
                    <h1>Orfanatos Cadastrados</h1>
                    <span>2 orfanatos aaaa</span>
                </header>
            </main>
        </div>
    )
}

export default Dashboard