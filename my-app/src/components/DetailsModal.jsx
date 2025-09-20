import React from "react";
import { formatDistanceToNowStrict, parseISO } from "date-fns";

/**
 * Modal component for showing full podcast details.
 * @param {Object} props
 * @param {Object} props.podcast - The selected podcast
 * @param {Function} props.onClose - Function to close modal
 */
export default function DetailsModal({ podcast, onClose }) {
	if (!podcast) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div
				className="modal"
				onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
			>
				<button className="close-btn" onClick={onClose}>
					✕
				</button>

				{/* Title */}
				<h2 className="modal-title">{podcast.title}</h2>

				{/* Main content layout */}
				<div className="modal-body">
					{/* Left: Image */}
					<img
						src={podcast.image}
						alt={podcast.title}
						className="modal-cover"
					/>

					{/* Right: Description + details */}
					<div className="modal-info">
						<h4>Description</h4>
						<p className="description">{podcast.description}</p>

						{/* Genres */}
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
			</div>
		</div>
	);
}
