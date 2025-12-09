import { supabase } from './supabaseClient';

// Fetch all blogs from Supabase
export async function fetchBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    return [];
  }
}

// Fetch single blog by slug
export async function fetchBlogBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching blog:', error.message);
    return null;
  }
}

// Add new blog
export async function addBlog(blogData) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          slug: blogData.slug,
          title: blogData.title,
          image: blogData.image,
          summary: blogData.summary,
          content: blogData.content || blogData.summary,
          created_by: blogData.userId,
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error adding blog:', error.message);
    return { success: false, error: error.message };
  }
}

// Update blog
export async function updateBlog(slug, blogData) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .update({
        title: blogData.title,
        image: blogData.image,
        summary: blogData.summary,
        content: blogData.content || blogData.summary,
      })
      .eq('slug', slug)
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating blog:', error.message);
    return { success: false, error: error.message };
  }
}

// Delete blog
export async function deleteBlog(slug) {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('slug', slug);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog:', error.message);
    return { success: false, error: error.message };
  }
}

// Delete multiple blogs
export async function deleteBlogs(slugs) {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .in('slug', slugs);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting blogs:', error.message);
    return { success: false, error: error.message };
  }
}

// Listen to real-time updates
export function subscribeToBlogs(callback) {
  const subscription = supabase
    .from('blogs')
    .on('*', (payload) => {
      callback(payload);
    })
    .subscribe();

  return subscription;
}
