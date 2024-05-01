import { FC, HTMLProps } from 'react';
// internal imports
import { BlockConfigs } from '@/typings';
import block from './block.json';
// styles
import './styles.css';

/**
 * TYPINGS
 */
export interface SectionGiftsProps extends HTMLProps<HTMLDivElement> {
	data?: any;
	queryVars?: any;
}

/**
 * COMPONENT
 */
export const SectionGifts: FC<SectionGiftsProps> & BlockConfigs = ({
	data, // Dynamically fetched props by GraphQL query
}) => {
	return (
		<div className="supt-section-gifts">
			<div className="supt-section-gifts__inner">
				<div>
					<h2>You’re stranded on a desert island</h2>
					<div>
						<p>What do you wish you had brought with you?</p>
					</div>
				</div>
			</div>

			{/* <div>
				<h2>Dynamic data fetching</h2>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div> */}
		</div>
	);
};

SectionGifts.slug = block.slug;
SectionGifts.title = block.title;
