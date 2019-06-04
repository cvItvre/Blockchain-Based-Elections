import React, { Component } from 'react';

import { Menu } from 'primereact/menu';

// import './styles.css';

class sideBar extends Component {

    constructor() {
        super();
        this.state = {
            items: [
                {
                    label: 'Item - 1',
                    icon: 'pi pi-fw- pi-upload'
                },
                {
                    label: 'Item - 2',
                    icon: 'pi pi-fw- pi-upload'
                }
            ],
        };
    }

    render() {
        return (
            <div>
                <div className="content-section">
                    <h1>Menu</h1>
                    <p>Menu is a navigation command bar</p>
                </div>

                <div className="content-section">
                    <Menu model={this.state.items} />
                </div>
            </div>
        );
    }

}


// const sideBar = () => {
   
//     let items = [
//        {label: 'item - 1', icon: 'pi-plus'},
//        {label: 'item - 2', icon: 'pi-trash'}
//    ];

//    return (
//         <Menu model={items} />
//    );
// };

export default sideBar;