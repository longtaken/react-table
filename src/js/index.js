import React from 'react';
import {render} from 'react-dom';
import Main from './main.jsx';
const root = document.getElementById('main');
import '../scss/common.scss';
window.Global={};

let dataArr = [
    {
        "name": "运动户外",
        "level": 1,
        "child": [
            {
                "name": "鞋子",
                "level": 2,
                "child": [
                    {
                        "name": "板鞋",
                        "level": 3,
                        "child": null
                    }
                ]
            },
            {
                "name": "运动服饰",
                "level": 2,
                "child": [
                    {
                        "name": "运动衣",
                        "level": 3,
                        "child": null
                    },
                    {
                        "name": "运动裤",
                        "level": 3,
                        "child": null
                    }
                ]
            }
        ]
    },
    {
        "name": "潮流",
        "level": 1,
        "child": [
            {
                "name": "T-shirt",
                "level": 2,
                "child": [
                    {
                        "name": "黑色",
                        "level": 3,
                        "child": null
                    }
                ]
            }
        ]
    },
    {
        "name": "服装",
        "level": 1,
        "child": [
            {
                "name": "上衣",
                "level": 2,
                "child": [
                    {
                        "name": "衬衫",
                        "level": 3,
                        "child": [
                          {
                            "name":"短衬衫",
                            "level": 4,
                            "child": null
                          },
                          {
                            "name":"长衬衫",
                            "level": 4,
                            "child": null
                          },
                        ]
                    }
                ]
            }
        ]
    },
];

render(
  <Main allData={dataArr} />,
  root
);
