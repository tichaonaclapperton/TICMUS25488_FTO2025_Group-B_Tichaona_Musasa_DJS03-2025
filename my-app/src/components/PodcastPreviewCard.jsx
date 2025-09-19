import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict, parseISO } from "date-fns";

/**
 * A reusable podcast preview card.
 * Shows podcast image, title, seasons, genres and last updated.
 * @param {Object} props
 * @param {Object} props.podcast - Podcast data
 * @param {Function} props.onClick - Callback when card is clicked
 */
export default function PodcastPreviewCard({ podcast, onClick }) {
	return (
		<div className="podcast-card" onClick={onClick} role="button" tabIndex={0}>
			<img src={podcast.image} alt={podcast.title} className="cover" />

			<div className="card-content">
				<h2>{podcast.title}</h2>
				<p>{podcast.seasons} seasons</p>

				{/* Genres as badges */}
				{podcast.genres && podcast.genres.length > 0 && (
					<div className="genres">
						<strong>Genre:</strong>
						{podcast.genres.map((g, i) => (
							<span key={i} className="genre-badge">
								{g}
							</span>
						))}
					</div>
				)}

				{/* Last updated */}
                
				{podcast.updated && (
                    
					<p className="updated">
						<strong>Last Updated:</strong>{" "}
						{formatDistanceToNowStrict(
							typeof podcast.updated === "string"
								? parseISO(podcast.updated)
								: podcast.updated,
							{ addSuffix: true }
						)}
					</p>
				)}
			</div>
		</div>
	);
}

PodcastPreviewCard.propTypes = {
	podcast: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		image: PropTypes.string,
		seasons: PropTypes.number,
		genres: PropTypes.arrayOf(PropTypes.string),
		updated: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
	}).isRequired,
	onClick: PropTypes.func,
};
