'use client';
import  axios from '@/providers/api.provider';
import { useQuery } from 'react-query';
import { useState } from 'react';

export default function Post()
{
    const [posts, setPosts] = useState([]);

    const getPostApi = async () => {
        return await axios.get('/dashboards/posts');
    }

    useQuery({
        queryKey: ['getPostKey'],
        queryFn: getPostApi,
        onSuccess: ({data}) => {
            setPosts(data['data']);
        }
    });

    return(
        <div>
            <h1>Post</h1>
            <a href="#">Add Post</a>

            <div>
                {
                    posts.map((post, key) => (
                        <div key={key}>
                            <div>
                                <h1>{ post['title'] }</h1>
                                <span>{ post['date'] }</span>
                                <p>
                                    {
                                        post['image']
                                    }
                                </p>
                                <p>
                                    {
                                        post['content']
                                    }
                                </p>
                                <br />
                                <h1>Comments</h1>
                                <ul>
                                    {
                                        post['comments'].map((comment, key) => (
                                            <li key={key}>
                                                <h3>{ comment['comment'] }</h3>
                                                <p>{ comment['created_by'] }</p>
                                                <p>{ comment['created_at'] }</p>
                                                <br />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <br />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}