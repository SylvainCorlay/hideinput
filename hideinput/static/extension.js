define(['base/js/namespace'], function(Jupyter) {
    'use strict';

	var hide_all_input = function () {
        var notebook_metadata = Jupyter.notebook.metadata;
	    var cells = Jupyter.notebook.get_cells();
        if (notebook_metadata.input_collapsed) {
            notebook_metadata.input_collapsed = false;
            for (var i=0; i<cells.length; i++)
            {
               if (!cells[i].metadata.input_collapsed) {
                   cells[i].element.find('div.input').show('fast');
               }
            }
        } else {
            notebook_metadata.input_collapsed = true;
            Jupyter.notebook.element.find('div.input').hide('fast');
        }
	}

	var hide_input = function () {
	    // Find the selected cell
	    var cell = Jupyter.notebook.get_selected_cell();
	    // Toggle visibility of the input div
	    cell.element.find('div.input').toggle('fast')
	    if ( cell.metadata.input_collapsed ) {
            cell.metadata.input_collapsed = false;
	    } else {
    		cell.metadata.input_collapsed = true;
	    }
	};

    if (Jupyter.notebook.metadata.input_collapsed) {
        Jupyter.notebook.element.find('div.input').hide(0);
    }

    var cells = Jupyter.notebook.get_cells();
    cells.forEach( function(cell) {
        if( cell.metadata.input_collapsed ) {
	        cell.element.find('div.input').hide(0);
	    }
    });

    Jupyter.toolbar.add_buttons_group([{
        label: 'Toggle input',
	    icon: 'fa-times',
	    callback: hide_input,
    }, {
        label: 'Toggle all input',
	    icon: 'fa-times-circle',
	    callback:hide_all_input,
    }]);

    var load_ipython_extension = function () {
    };

    return {
        load_ipython_extension: load_ipython_extension
    };
});
