import React from 'react';
import SideMenu from './SideMenu';

function AdminPage() {
    return (
        <div className="flex">
            <SideMenu />
            <section className="flex-1">
                <h1 className="text-3xl font-bold p-6">Admin Panel</h1>
                <p className="p-6">Here you can add and edit site content.</p>
            </section>
        </div>
    );
}

export default AdminPage;