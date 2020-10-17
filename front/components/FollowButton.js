import React, { useCallback } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);

    const isFollowing = me?.Followings.find((v) => v.id === post.User.id); // 내가 팔로우 중인 아이디들 중에 포스트 작성자의 아이디가 있으면 true

    const onClickButton = useCallback(() => {
        if (isFollowing) {
            // 팔로잉 상태에서 버튼을 누르면 언팔
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            });
        } else {
            // 아니면 팔로우
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            });
        }
    }, [isFollowing]);

    if (post.User.id === me.id) {
        return null;
    }
    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            {isFollowing ? "언팔로우" : "팔로우"}
        </Button>
    );
};

FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
};

export default FollowButton;
