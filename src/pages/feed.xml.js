import { getEpisodes, episodePath } from '../lib/episodes.js';
import { site } from '../data/site.js';

const xml = (value) => String(value).replace(/[<>&"']/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]);
const cdata = (value) => `<![CDATA[${value.replace(/\]\]>/g, ']]]]><![CDATA[>')}]]>`;

export async function GET({ site: base }) {
  const episodes = await getEpisodes();
  const artwork = xml(new URL(site.artwork, base).href);
  const items = episodes.map((episode) => {
    const data = episode.data;
    if (!episode.rendered?.html) throw new Error(`Missing rendered show notes for ${episode.id}`);
    return `<item>
      <title>${xml(`${data.number}. ${data.title}`)}</title>
      <link>${xml(new URL(episodePath(episode), base).href)}</link>
      <itunes:author>${xml(site.author)}</itunes:author>
      <itunes:subtitle>${xml(data.summary)}</itunes:subtitle>
      <itunes:summary>${xml(data.summary)}</itunes:summary>
      <itunes:image href="${artwork}" />
      <enclosure length="${data.length}" url="${xml(data.enclosure_url)}" type="audio/mpeg" />
      <guid isPermaLink="true">${xml(data.guid)}</guid>
      <pubDate>${data.date.toUTCString()}</pubDate>
      <itunes:duration>${xml(data.duration)}</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
      <description>${cdata(episode.rendered.html)}</description>
    </item>`;
  }).join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.title)}</title>
    <link>${xml(base.href)}</link>
    <atom:link href="${xml(new URL('/feed.xml', base).href)}" rel="self" type="application/rss+xml" />
    <language>ru</language>
    <copyright>${xml(site.copyright)}</copyright>
    <itunes:subtitle>${xml(site.description)}</itunes:subtitle>
    <itunes:author>${xml(site.author)}</itunes:author>
    <itunes:summary>${xml(site.description)}</itunes:summary>
    <description>${xml(site.description)}</description>
    <itunes:owner><itunes:name>${xml(site.author)}</itunes:name><itunes:email>${xml(site.email)}</itunes:email></itunes:owner>
    <itunes:image href="${artwork}" />
    <itunes:category text="Technology" />
    <itunes:explicit>no</itunes:explicit>
    <pubDate>${episodes[0].data.date.toUTCString()}</pubDate>
    <lastBuildDate>${episodes[0].data.date.toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
  return new Response(feed, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
