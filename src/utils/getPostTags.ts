interface TagDocument {
  tag: {
    id: string
    data: {
      tag_name: string
      tag_color: string
    }
  }
}

export const getPostTags = (tags: TagDocument[]): Array<{ id: string; name: string; color: string }> => {
  return tags.map(item => {
    return {
      id: item.tag.id,
      name: item.tag.data.tag_name,
      color: item.tag.data.tag_color
    }
  })
}
