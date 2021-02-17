import React from 'react';

export default function AlertIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 56 72">
            <defs>
                <style>
                    {`
                    .cls-1-alert {
                fill: none;
                stroke: #1e8aad;
                stroke-width: 2px;
            }

                .cls-2-alert {
                fill: url(#patternAlert);
            }
                    `}
                </style>
                <pattern id="patternAlert" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 47 60">
                    <image
                        width="47"
                        height="60"
                        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAA8CAMAAADBuxOrAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABm1BMVEUchKYchagdh6odiawchaccg6UchqkdiKseiq0diaseiawchqgcg6QdiKodh6kchKUdh6gch6kdhqgcgqMbfp8cgaIcgqQdhKYeiKsdhagaepkbfp4YbooaeZgeiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0diaweiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiaweiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0diaweiq0eiq0eiq0eiq0diKoeiq0diKseiq0diaweiq0diawdiaweiq0diKsdiKodiawdiawdiaweiq0eiq0eiq0diaweiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0eiq0dhacdhqgeiaweiaweiq0eiaweiaweiq3///97QDV5AAAAh3RSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6lozz/oX0fOfpefr8ewfd4Unf/eJPdbb19rt3Per77etAm+6RYVlebZmf0qUZ7DQIPOVv+FBsocOeJvDyLSNyYCY5W/nCNtoejxVwZlnjVFRragS45lQJjvdZeomHRU1oP11hXS3eami4xnzHAAAAAWJLR0SIa2YWWgAAAAd0SU1FB+QKBw8QOYj9DkgAAALoSURBVEjH7db9X9JAHMDxuZvtRGeJopZJeaEFLXNU2sNMfEwRLbQ0NJ+fn0VRpEfzoe+/3e22A1QG8+f6/ODLO9631+3AiSDwikSxiP+OvPe8KOsFqZgnXPA3zND9BtLwAFkjey9jxPI2AIDPaw6wnMdjjEpKUCOhnjQyjR34JjB66Mwj9MjPfOCxM68+IcyTZtWBx09bNDDTgs9wIf/8RSsBHml7+Sqfx6/fUEz0dr9GNH+7bgzedmA7r4Z8FHR2dff09r3r6+3p7uqkK3z9am6vDgToq+FBessuum0XvdnBML2CNqBm+Rs81E95ZIidqOXp6QxF6MGGUBFPQLwOeqnIML7k8TBd4HuPZKu0x00Wv+TZgg847fluogRGRnEOj0dHQPso8/1w/wlgjJ4cPdRszybGAMZRqRnfz+cYTEyKkiRd8sbM5ATEvljOuj6aIjCO6XmVlUmlaV8qlZXROTwOZMr66xEkltwP+rRivhFi2ovmhDKtQ79sQkFhzbRA82y5lagwr4h8YrYZWmZMaO1/bh4WFsvTMZ8ZLi7A/Jy1f3bXxmkuLWeA8cGWM8PlJSBR84QsvwIkJN/MRH3WSA4RWEFZ57naDtoakjIhfGG0pkH7qrkf9nM9APPTyL7peQisX/SRDdm+jcgVv7lVbt/W5hUf3L5l33bwv/+X/I5e0Os7WX7XX9D7d/nzpKICRR34KKqgGc8LKb5HYD+hKDZaURL7QPbi7HlCOzhMAuhHGOdeoGB8pAMkDw9MzzhAKo9PGSDZFTd8/CvjEEkdJbZzlThKRYAvENC3JP93qO8Hc7Wvc5DsQkJHmjso+V340XYdnxCw96fzfmFBxNdJzOHdmRz4yipPpqrKAt5VXF1z/Jt3XFNd7MrnXbW1tSe+Vp7vhI5d9t51m3YaSx9f7NSYcNn6O0bucPr7UtjNZux83V2jevXMXKCdqfVspi6/96jhGP2+FAurHmfe4z49/3N+6vbk8H8BW9t1v8OBDTkAAAAASUVORK5CYII="
                    />
                </pattern>
            </defs>
            <g id="Groupe_1" data-name="Groupe 1" transform="translate(-0.498)">
                <line id="Ligne_1" data-name="Ligne 1" className="cls-1-alert" y2="15.381" transform="translate(28.379 20.764)" />
                <rect id="Rectangle_2" data-name="Rectangle 2" className="cls-2-alert" width="56" height="72" transform="translate(0.498)" />
            </g>
        </svg>
    );
}
