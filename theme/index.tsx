import React from 'react';
import defaultTheme from 'rspress/theme';
import './custom.css';

const SITES = ['赛事星', '知网文化', '手机知网', '科技查新', '知网书店'];

function SitesSection() {
  return (
    <div className="cnki-sites-wrap">
      <h2 className="cnki-sites-title">采用本站规范的站点</h2>
      <p className="cnki-sites-sub">以下站点已接入 CNKI 前端规范与样式库</p>
      <div className="cnki-sites">
        {SITES.map(name => (
          <div className="cnki-site-card" key={name}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

function Layout(props: any) {
  return <defaultTheme.Layout {...props} afterFeatures={<SitesSection />} />;
}

const theme = { ...defaultTheme, Layout };

export default theme;

export * from 'rspress/theme';
