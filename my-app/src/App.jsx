import React, { useEffect, useState, useCallback } from "react";
import PodcastPreviewCard from "./components/PodcastPreviewCard";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import DetailsModal from "./components/DetailsModal";
import SearchBar from "./components/SearchBar";
import { genres } from "./genres/data.js";

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "https://podcast-api.netlify.app/";

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchPodcasts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL, { signal });
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
        const data = await res.json();

        const normalized = (Array.isArray(data) ? data : data.shows || []).map((p) => ({
          id: p.id?.toString() ?? p.showId?.toString() ?? String(Math.random()),
          title: p.title ?? p.name ?? "Untitled",
          image: p.image ?? p.cover ?? p.artwork ?? "",
          seasons:
            typeof p.seasons === "number"
              ? p.seasons
              : Array.isArray(p.seasonDetails)
              ? p.seasonDetails.length
              : p.seasonsCount ?? 0,
          genres:
            Array.isArray(p.genres) && p.genres.length
              ? p.genres.map((id) => genres.find((g) => g.id === id)?.title || `Genre ${id}`)
              : [],
          updated:
            p.updated ?? p.lastUpdated ?? p.modified ?? p.publishedAt ?? p.pubDate ?? p.updatedAt ?? null,
          description: p.description ?? p.summary ?? "",
        }));

        setPodcasts(normalized);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Failed to fetch podcasts");
      } finally {
        setLoading(false);
      }
    }

    fetchPodcasts();
    return () => controller.abort();
  }, []);

  const onCardClick = useCallback((podcast) => setSelected(podcast), []);
  const onCloseModal = useCallback(() => setSelected(null), []);

  // Filter podcasts by title or genre
  const filteredPodcasts = podcasts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.genres.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Podcast App</h1>
      </header>

      {/* Search Bar */}
      <div className="search-container">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <section className="content">
        {loading && <Loading message="Loading podcasts..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && filteredPodcasts.length === 0 && (
          <div className="empty">No podcasts found.</div>
        )}
        {!loading && !error && filteredPodcasts.length > 0 && (
          <div className="grid" role="list">
            {filteredPodcasts.map((p) => (
              <PodcastPreviewCard key={p.id} podcast={p} onClick={() => onCardClick(p)} />
            ))}
          </div>
        )}
      </section>

      {selected && <DetailsModal podcast={selected} onClose={onCloseModal} />}
    </main>
  );
}
