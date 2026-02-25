import React from 'react';

function Support() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-white text-center mb-8">How can we help you?</h1>

                <div className="bg-slate-800 shadow sm:rounded-lg overflow-hidden border border-slate-700">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-white">Contact Support</h3>
                        <div className="mt-2 max-w-xl text-sm text-slate-400">
                            <p>Have issues with your loan application? Fill out the form below and our team will get back to you.</p>
                        </div>
                        <form className="mt-5 space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                                <div className="mt-1">
                                    <input type="email" name="email" id="email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-600 bg-slate-900 text-white rounded-md p-2" placeholder="you@example.com" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                                <div className="mt-1">
                                    <textarea id="message" name="message" rows="4" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-600 bg-slate-900 text-white rounded-md p-2" placeholder="Describe your issue..."></textarea>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <div className="bg-slate-800 overflow-hidden shadow rounded-lg border border-slate-700">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-slate-400 truncate">FAQ</dt>
                            <dd className="mt-1 text-xl font-semibold text-white">Frequently Asked Questions</dd>
                            <p className="mt-2 text-sm text-slate-400">Browse our knowledge base for quick answers to common questions about loan eligibility.</p>
                        </div>
                    </div>
                    <div className="bg-slate-800 overflow-hidden shadow rounded-lg border border-slate-700">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-slate-400 truncate">Live Chat</dt>
                            <dd className="mt-1 text-xl font-semibold text-white">Talk to an Agent</dd>
                            <p className="mt-2 text-sm text-slate-400">Available Mon-Fri, 9am - 5pm EST. Get real-time assistance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Support;
