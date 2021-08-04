import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'

const TextReport = ({ data }) => {
    let textData = data.filter(t => t.answer !== null)
    return (
        <div className="flex flex-col md:flex-row mx-2 md:mx-10 space-x-2 items-center" >
            <Menu as="div" className="relative inline-block flex w-full px-4 py-2">
                {({ open }) => (
                    <>
                        <div>
                            <Menu.Button className="inline-flex justify-center w-full rounded-md 
                                border border-gray-300 shadow-sm px-4 py-2  text-sm
                                 font-medium text-gray-100 focus:outline-none 
                                z-10
                                 bg-purple-500
                               ">
                                Let's see what they have to say
                                {open ?
                                    <ChevronUpIcon className="mr-1 ml-2 h-5 w-5" aria-hidden="true" /> :
                                    <ChevronDownIcon className="mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                }

                            </Menu.Button>
                        </div>
                        <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                static
                                className=" absolute top-12  left-4 right-0 rounded-md shadow-lg 
                                            bg-purple-300 font-semibold ring-1 ring-black ring-opacity-5 focus:outline-none "
                            >
                                {textData && textData.length > 0 &&
                                    <>
                                        {textData.map((d, index) =>
                                            <div key={index}>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <div
                                                            className="block w-full px-4 py-2 text-sm tracking-wider border-t-2 border-gray-200"
                                                        >
                                                            {d.answer}
                                                        </div>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        )}
                                    </>

                                }

                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </div>
    )
}
export default TextReport;