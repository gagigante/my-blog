import { Tag } from '@components/Tag'
import { Tag as TagDTO } from '@models/Tag'

import styles from '@styles/components/TagsInput.module.scss'
import { useMemo, useState } from 'react'

interface TagsInputProps {
  label: string
  placeholder?: string
  suggestions: TagDTO[]
  onChange: (selectedTags: TagDTO[]) => void
}

type TagSelection = TagDTO & { selected: boolean }

export const TagsInput = ({ label, placeholder, suggestions, onChange }: TagsInputProps) => {
  const [searchInput, setSearchInput] = useState('')
  const [filteredTags, setFilteredTags] = useState<TagSelection[]>([])
  const [tags, setTags] = useState<TagSelection[]>(() =>
    suggestions.map(suggestion => ({
      ...suggestion,
      selected: false
    }))
  )

  function handleFilterTags(value: string): void {
    setSearchInput(value)

    if (value.length === 0) {
      return setFilteredTags([])
    }

    const results = tags.filter(tag => !tag.selected && tag.name.toLowerCase().includes(value.toLowerCase()))

    setFilteredTags(results)
  }

  function handleSelectTag(tagId: string): void {
    const selectedTags = tags.map(tag => {
      if (tag.id === tagId) {
        return {
          ...tag,
          selected: true
        }
      }

      return tag
    })

    setTags(selectedTags)
    setSearchInput('')
    setFilteredTags([])

    onChange(convertTags(selectedTags.filter(tag => tag.selected)))
  }

  function handleRemoveTag(tagId: string): void {
    const selectedTags = tags.map(tag => {
      if (tag.id === tagId) {
        return {
          ...tag,
          selected: false
        }
      }

      return tag
    })

    setTags(selectedTags)

    onChange(convertTags(selectedTags.filter(tag => tag.selected)))
  }

  function formatTagName(tagName: string): string {
    const regex = new RegExp(`${searchInput}`, 'gi')

    return tagName.replaceAll(regex, match => `<b>${match}</b>`)
  }

  function convertTags(tags: TagSelection[]): TagDTO[] {
    return tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      color: tag.color
    }))
  }

  const selectedTags = useMemo(() => tags.filter(tag => tag.selected), [tags])

  return (
    <div className={styles.wrapper}>
      <fieldset className={styles.inputContainer}>
        <legend>{label}</legend>

        <input
          type="text"
          placeholder={placeholder}
          value={searchInput}
          onChange={e => handleFilterTags(e.target.value)}
        />

        {!!filteredTags.length && (
          <ul className={styles.inputDropdown}>
            {filteredTags.map(tag => (
              <li key={tag.id}>
                <button onClick={() => handleSelectTag(tag.id)}>
                  <span dangerouslySetInnerHTML={{ __html: formatTagName(tag.name) }}></span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      {!!selectedTags.length && (
        <div className={styles.tagsContainer}>
          {selectedTags.map(tag => (
            <Tag key={tag.id} id={tag.id} title={tag.name} color={tag.color} closeButtonFunction={handleRemoveTag} />
          ))}
        </div>
      )}
    </div>
  )
}
