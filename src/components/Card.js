
const Card = ({ cards }) => {

    return (
        <>
            {cards.map((items, key) => (
                <article className="cards md:w-64 h-80 rounded-lg overflow-hidden shadow-lg" key={key}>
                    <section className="card">
                        <img src={`${items.image}`} alt={`${items.name} image`} className="w-full md:h-full sm:h-80 xs:h-80"/>
                        <div className="card__overlay h-full">
                            <div className="card__header">
                                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                <div className="card__header-text text-xl font-extrabold p-2 m-2">
                                    <h3 className="card__title">{items.name}</h3>
                                </div>
                            </div>
                            <p className="card__description text-xs px-5">{items.description}</p>
                        </div>
                    </section>
                </article>
            ))}

        </>
    )
}

export default Card