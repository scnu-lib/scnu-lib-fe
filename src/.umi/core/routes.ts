// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'F:/vscode/scnu-lib-fe/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "exact": true,
    "path": "/",
    "redirect": "/home"
  },
  {
    "path": "/home",
    "component": require('@/pages/Index').default,
    "routes": [
      {
        "path": "/home/",
        "redirect": "/home/activity",
        "exact": true
      },
      {
        "path": "/home/activity",
        "title": "活动页",
        "component": require('@/pages/Reader/Activity/Activity').default,
        "exact": true
      },
      {
        "path": "/home/listact",
        "title": "活动列表",
        "component": require('@/pages/Reader/Activity/ActivityList').default,
        "exact": false
      },
      {
        "path": "/home/adminAct",
        "title": "活动管理",
        "component": require('@/pages/Admin/AdminAct').default,
        "exact": false,
        "routes": [
          {
            "path": "/home/adminAct/createact",
            "exact": false,
            "title": "创建活动",
            "component": require('@/pages/Admin/CreateAct').default
          },
          {
            "path": "/home/adminAct/listact",
            "exact": false,
            "title": "活动列表",
            "component": require('@/pages/Admin/ListAct').default
          },
          {
            "path": "/home/adminAct/actParticipants/:id",
            "exact": true,
            "title": "参与用户列表",
            "component": require('@/pages/Admin/Actmanage/ActParticipants').default
          }
        ]
      },
      {
        "path": "/home/adminUser",
        "title": "用户管理",
        "component": require('@/pages/Admin/AdminUser').default,
        "exact": false,
        "routes": [
          {
            "path": "/home/adminUser/user",
            "exact": false,
            "title": "用户管理",
            "component": require('@/pages/Admin/User').default
          },
          {
            "path": "/home/adminUser/usernotices/:id",
            "exact": true,
            "title": "用户联系方式",
            "component": require('@/pages/Admin/AdminNotice').default
          },
          {
            "path": "/home/adminUser/userdetails/:id",
            "exact": true,
            "title": "用户详情",
            "component": require('@/pages/Admin/AUserSetting').default
          }
        ]
      },
      {
        "path": "/home/user",
        "title": "用户中心",
        "component": require('@/pages/User/User').default,
        "exact": true
      }
    ]
  },
  {
    "path": "/login",
    "component": require('@/pages/Login/SignIn').default,
    "exact": true
  },
  {
    "path": "/Signup",
    "component": require('@/pages/Login/SignUp').default,
    "exact": true
  },
  {
    "component": require('@/pages/PageNotFound').default,
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
