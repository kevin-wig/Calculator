import React from 'react';

import './style.scss';
import DisplayPanel from '../../components/DisplayPanel';
import ButtonPanel from '../../components/ButtonPanel';

interface IDashboardProps {}

const Dashboard: React.FC<IDashboardProps> = () => {
    return (
        <div className="dashboard-wrapper">
            <div className="calculator">
                <DisplayPanel />

                <ButtonPanel />
            </div>
        </div>
    );
};

export default Dashboard;
