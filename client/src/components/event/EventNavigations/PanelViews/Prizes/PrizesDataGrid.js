import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Actions
import { setDialog } from '../../../../../actions/alert';

//material ui
import { DataGrid } from '@material-ui/data-grid';
import { Grid, Typography } from '@material-ui/core';

const PrizesDataGrid = ({ prize: { category, rankingPrizes }, setDialog }) => {
  const tempRows = useMemo(() => [], []);
  let setOfPrizes = useMemo(() => '', []);
  const [readyToView, setReadyToView] = useState(true);
  const [newRows, setNewRows] = useState([]);

  const setRows = useCallback(
    rankingPrizes => {
      rankingPrizes.forEach(rankingPrize => {
        rankingPrize.prizes.forEach(prize => {
          // eslint-disable-next-line
          setOfPrizes = setOfPrizes.concat(
            `${
              prize.prizeTypeVariant !== ''
                ? `${prize.prizeTypeVariant} - `
                : ''
            }${prize.amountOrValue !== '' ? `${prize.amountOrValue}, ` : ''}`,
          );
        });
        tempRows.push({
          id: Math.floor(Math.random() * 10000) + 1,
          Rank: rankingPrize.rank,
          Prizes: setOfPrizes,
        });
        // eslint-disable-next-line
        setOfPrizes = '';
      });
      return tempRows;
    },
    [tempRows, setOfPrizes, setNewRows],
  );

  useEffect(() => {
    if (rankingPrizes !== undefined) {
      setRows(rankingPrizes);
      setNewRows(tempRows);
      setReadyToView(true);
    }
  }, [setRows, rankingPrizes, setReadyToView, setNewRows, tempRows]);

  return (
    <Fragment>
      {readyToView ? (
        <>
          <Grid item xs={12}>
            <Typography variant='h6' color='primary'>
              {category}
            </Typography>
          </Grid>
          <div style={{ height: 250, width: '100%', marginTop: '10px' }}>
            <DataGrid
              rows={newRows}
              disableColumnMenu
              disableColumnSelector
              hideFooterRowCount
              hideFooterPagination={newRows.length < 10 ? true : false}
              hideFooterSelectedRowCount
              onRowClick={item =>
                setDialog(
                  `Rank - ${item.row.Rank}`,
                  `Prizes - ${item.row.Prizes}`,
                  'Close',
                  '',
                  '',
                )
              }
              pageSize={10}
              columns={[
                { field: 'Rank', sortable: false, flex: 0.3 },
                { field: 'Prizes', sortable: false, flex: 1 },
              ]}
            />
          </div>
        </>
      ) : (
        ''
      )}
    </Fragment>
  );
};
PrizesDataGrid.propTypes = {
  category: PropTypes.string,
  rankingPrizes: PropTypes.array,
  setDialog: PropTypes.func,
};

export default connect(null, { setDialog })(PrizesDataGrid);
