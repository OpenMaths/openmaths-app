module openmaths.specs {
    'use strict';

    describe('Board model', () => {
        let model = new openmaths.Board();

        afterEach(() => {
            model.columns.current = 3;
            model.rows.current = 3;

            model.initGrid();
        });

        it('should have the correct state set', () => {
            expect(model.state).toEqual('explore.board');
        });

        it('should correctly fill the grid', () => {
            expect(model.grid.length).toEqual(model.rows.current);
            expect(model.grid[0].length).toEqual(model.columns.current);
        });

        it('should be possible to update the grid', () => {
            expect(model.updateGrid).toBeDefined();
        });

        it('should add a column to the grid when instructed', () => {
            let originalNumberOfColumns = model.columns.current;

            model.updateColumn(UpdateGridOperator.ADD);

            _.forEach(model.grid, row => {
                expect(row.length).toEqual(originalNumberOfColumns + 1);
            });

            expect(model.columns.current).toEqual(originalNumberOfColumns + 1);
        });

        it('should not add a column to the grid if a maximum number of columns is already set', () => {
            model.columns.current = model.columns.max;

            model.updateColumn(UpdateGridOperator.ADD);

            expect(model.columns.current).toEqual(model.columns.max);
        });

        it('should remove a column from the grid when instructed', () => {
            let originalNumberOfColumns = model.columns.current;

            model.updateColumn(UpdateGridOperator.REMOVE);

            expect(model.columns.current).toEqual(originalNumberOfColumns - 1);
        });

        it('should not remove a column from the grid if a minimum number of columns is set', () => {
            model.columns.current = model.columns.min;

            model.updateColumn(UpdateGridOperator.REMOVE);

            expect(model.columns.current).toEqual(model.columns.min);
        });

        it('should add a row to the grid when instructed', () => {
            let originalNumberOfRows = model.rows.current;

            model.updateRow(UpdateGridOperator.ADD);

            expect(model.rows.current).toEqual(originalNumberOfRows + 1);
        });

        it('should not add a row to the grid if a maximum number of rows is already set', () => {
            model.rows.current = model.rows.max;

            model.updateRow(UpdateGridOperator.ADD);

            expect(model.rows.current).toEqual(model.rows.max);
        });

        it('should remove a row from the grid when instructed', () => {
            let originalNumberOfRows = model.rows.current;

            model.updateRow(UpdateGridOperator.REMOVE);

            expect(model.rows.current).toEqual(originalNumberOfRows - 1);
        });

        it('should not remove a row from the grid if a minimum number of rows is set', () => {
            model.rows.current = model.rows.min;

            model.updateRow(UpdateGridOperator.REMOVE);

            expect(model.rows.current).toEqual(model.rows.min);
        });
    });
}