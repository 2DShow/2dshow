import { getCollection } from 'astro:content';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const formatDate = (date) => dateFormatter.format(date);

export function episodePath(episode) {
  return `/podcast/${episode.id.replace(/^(\d{4})-(\d{2})-(\d{2})-/, '$1/$2/$3/')}.html`;
}

export async function getEpisodes() {
  return (await getCollection('episodes')).sort((a, b) => b.data.date - a.data.date);
}
