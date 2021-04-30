import React, {useState, useEffect} from 'react';

function App() {
    const [img,
        setImg] = useState([]);
    const [isLoading,
        setIsLoading] = useState(true);
    const [searchTerm,
        setSearchTerm] = useState('');

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo&pretty=true`).then((res) => res.json()).then((data) => {
            setImg(data.hits)
            setIsLoading(false)
        }).catch((err) => console.log(err))
    }, [searchTerm]);

    return (
        <div className="font-mono mt-8 mb-8">
            <div className="w-max mx-auto p-2 flex border-b-2 border-gray-400">
                <input
                    type="text"
                    placeholder="Search Image Term..."
                    className="w-50 p-2 mr-4"
                    onChange={e => setSearchTerm(e.target.value)}
                    />
                <div className="p-2 text-white bg-green-500 rounded-lg cursor-pointer">Search</div>
            </div>

            {isLoading ? <div className="text-5xl mt-20 text-center mx-auto">Loading</div> : <div className="mt-10 px-16 gap-6 grid md:grid-cols-3">
                {img.map((item) => {
                    return (
                        <div key={item.id} className="bg-white shadow-lg rounded-md overflow-hidden">
                            <img src={item.largeImageURL} alt="random" className="w-max h-48 object-cover"/>
                            <div className="p-4">
                                <div className="font-semibold text-lg text-purple-700">Photo By {item.user}
                                </div>
                                <div className="text-sm mt-2">
                                    <div>
                                        <span className="font-bold">Views : {item.views}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-bold">Downloads : {item.downloads}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-black">Likes : {item.likes}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-8 flex flex-wrap gap-1">
                                    {item
                                        .tags
                                        .split(', ')
                                        .map((val) => {
                                            return (
                                                <div key={item.user_id} className="px-2 py-1 bg-yellow-100 rounded-full">#{val}</div>
                                            )
                                        })
}
                                </div>
                            </div>
                        </div>
                    )
                })
}
            </div>}
        </div>
    );
}

export default App;
