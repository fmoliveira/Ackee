import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import { DEVICES_SORTING_TOP, DEVICES_SORTING_RECENT } from '../../../../constants/devices'

import Headline from '../Headline'
import Text from '../Text'
import PresentationCounterList from '../presentations/PresentationCounterList'
import PresentationList from '../presentations/PresentationList'
import PresentationEmptyState, { ICON_LOADING, ICON_WARNING } from '../presentations/PresentationEmptyState'
import relativeDate from '../../utils/relativeDate'
import rangeLabel from '../../utils/rangeLabel'

const textLabel = (item, range, isRecent) => {

	if (item && item.date) return relativeDate(item.date)
	if (isRecent) return 'Recent'

	return rangeLabel(range)
}

const CardDevices = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState()

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive()

	const presentation = (() => {

		if (props.loading === true) return h(PresentationEmptyState, {
			icon: ICON_LOADING
		}, 'Loading devices')

		const hasItems = props.items.length > 0

		if (hasItems === true && props.sorting === DEVICES_SORTING_TOP) return h(PresentationCounterList, {
			items: props.items
		})

		if (hasItems === true && props.sorting === DEVICES_SORTING_RECENT) return h(PresentationList, {
			items: props.items,
			onEnter,
			onLeave
		})

		return h(PresentationEmptyState, {
			icon: ICON_WARNING
		}, 'No device')

	})()

	return (
		h('div', {
			className: 'card'
		},
			h('div', { className: 'card__inner' },
				h(Headline, {
					type: 'h2',
					small: true,
					className: 'color-white'
				}, props.headline),
				h(Text, {
					spacing: false
				}, textLabel(
					props.items[active],
					props.range,
					props.sorting === DEVICES_SORTING_RECENT
				)),
				presentation
			)
		)
	)

}

CardDevices.propTypes = {
	headline: PropTypes.string.isRequired,
	range: PropTypes.string.isRequired,
	sorting: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired
}

export default CardDevices