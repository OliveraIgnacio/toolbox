import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getList} from '../actions/actions'
import '../styles/table.css'

function Chart() {
  const dispatch = useDispatch();
  const allData = useSelector(state => state)

  useEffect(() => {
    dispatch(getList())
  }, [])

  return (
    <div>
      <Table striped bordered hover>
        <thead ClassName='thead'>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {
            console.log(allData.data)
          }
        </tbody>
      </Table>
    </div>
  );
}

export default Chart;