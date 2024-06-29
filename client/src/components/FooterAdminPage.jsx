import React from 'react';

const FooterAdminPage = () => {
    return (
        <div className="text-blue-gray-600">
            <footer className="py-2">
                <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">
                        © 2024, E-commerce made by 
                        <a href="" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-500"> Teodor Jenkler</a>
                    </p>
                    <ul className="flex items-center gap-4">
                        <li>
                            <a href="" target="_blank" rel="noopener noreferrer" className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">Teodor Jenkler</a>
                        </li>
                        <li>
                            <a href="" target="_blank" rel="noopener noreferrer" className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">About Me</a>
                        </li>
                        <li>
                            <a href="" target="_blank" rel="noopener noreferrer" className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">Linkedin</a>
                        </li>
                        <li>
                            <a href="" target="_blank" rel="noopener noreferrer" className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">License</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default FooterAdminPage;