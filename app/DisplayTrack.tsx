const DisplayTrack = ({
    name,
    artist,
    artWork,
    link,
    id,
}) => {
    return (
        <div className="window" style={{ margin: '32px' }}>
            <div className="title-bar">
                <div className="title-bar-text">
                    Whats my Jam?
                </div>
            </div>
            <div className="window-body">
                <ul>
                    <li>
                        {name}
                    </li>
                    <li>
                        <br />
                    </li>
                    <li>
                        <br />
                    </li>
                    <li>
                        {artist}
                    </li>
                    <li>
                        <br />
                    </li>
                    <li>
                        <img src={artWork} />
                    </li>
                    <li>
                        <br />
                    </li>
                    <li className="open-in-spotify">
                        <a href={link}>Open In Spotify</a>
                    </li>
                    <li>
                        <a href="/prevJams" className="prev-jams">
                            Previous Jams
                        </a>
                    </li>
                    {
                        id &&
                        <li>
                            <button
                                onClick={() => {
                                    const url = new URL(`${window.location.origin}/${id}`).href
                                    window.open(url, '_blank');
                                }}
                            >
                                Share
                            </button>
                        </li>
                    }

                </ul>
            </div>
        </div>
    )
}

export default DisplayTrack