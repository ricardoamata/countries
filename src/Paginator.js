import { Pagination } from "react-bootstrap";

function Paginator(props) {

	const prevPage = () => props.setPage(props.page-1);
	const nextPage = () => props.setPage(props.page+1);

	var pageGroup = Math.floor(props.page/10);
	var maxPageGroup = Math.floor(props.maxPage/10);
	var items = [];

	for(var i = 0; i < 10; i ++) {
		if(10*pageGroup+i > props.maxPage)
			break;
		items.push(10*pageGroup+i+1)
	}

	return (
		<Pagination className="mx-auto mt-5">
			<Pagination.First onClick={() => props.setPage(0)} disabled={props.page > 0 ? false : true} />
			<Pagination.Prev onClick={prevPage} disabled={props.page > 0 ? false : true} />

			{pageGroup > 0 ? <Pagination.Ellipsis /> : null}

			{pageGroup > 0 ? 
				<Pagination.Item onClick={() => props.setPage(10*pageGroup-1)}>
					{10*pageGroup}
				</Pagination.Item> : null
			}

			{items.map(item =>
				<Pagination.Item onClick={() => props.setPage(item-1)} active={item-1 === props.page}>
					{item}
				</Pagination.Item>
				
			)}

			{pageGroup < maxPageGroup ? 
				<Pagination.Item onClick={() => props.setPage(10*pageGroup+10)}>
					{10*pageGroup+11}
				</Pagination.Item> : null
			}

			{pageGroup < maxPageGroup ? <Pagination.Ellipsis /> : null}

			<Pagination.Next onClick={nextPage} disabled={props.page < props.maxPage ? false : true} />
			<Pagination.Last onClick={() => props.setPage(props.maxPage)} disabled={props.page < props.maxPage ? false : true} />
		</Pagination>
	)
}

export default Paginator;