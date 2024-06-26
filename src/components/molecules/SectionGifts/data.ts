import { gql } from '@/utils';

import { FetchApiFuncType } from '@/lib/fetch-api';

import block from './block.json';

// Export block slug for identification
export const slug = block.slug;

/**
 * Dynamic data formatter/parser.
 *
 * @param {unknown}     data      Data from GraphQL query response
 * @param {boolean} isEditor  Wheter the formatter function is executed within the WP block editor.
 * @returns             The transformed/formatted/parsed data
 */
export const formatter = (data: unknown, isEditor = false) => {
	return data; // Format data as you need
};

/**
 * GraphQL data fetching.
 * Should return the final props needed for the block
 *
 * @param {FetchApiFuncType} fetcher    The context based function to request the GraphQl endpoint.
 *                                Arguments: - {string} query, [{any} variables].
 * @param {Record<string, object> | null}      attributes The attributes of the block
 * @param {boolean}  isEditor   Wheter the context is within the WP block editor.
 */
export const getData = async (
	fetcher: FetchApiFuncType,
	attributes: Record<string, object> | null = null,
	isEditor: boolean = false
): Promise<any> => {
	// declare the GraphQL query string.
	const query = gql`
		query sectionGiftsQuery($categoryIn: [ID]) {
			gifts(where: { giftCategoryIn: $categoryIn }) {
				nodes {
					id: databaseId
					title(format: RENDERED)
					featuredImage {
						node {
							sourceUrl
							mediaDetails {
								width
								height
							}
						}
					}
					giftCategories {
						nodes {
							name
						}
					}
				}
			}
		}
	`;

	// construct the query variables (maybe based on the `attributes` argument)
	const variables = attributes?.queryVars || {};

	// retrieves the data
	const data = await fetcher(query, { variables });

	return formatter(data, isEditor);
};

/**
 * GraphQL fragment that can be used by another block's query.
 */
// export const fragment = gql`
// fragment sectionGiftsFragment on Post {
// 	id: databaseId
// 	title(format: RENDERED)
// 	uri
// }`;
