BEGIN;
SET SEARCH_PATH = public, auth, storage;
INSERT INTO storage.buckets(id, name)
VALUES ('avatars', 'avatars');

CREATE POLICY "anyone_can_view_avatar_bucket_rls_policy"
    ON storage.buckets FOR SELECT USING (
    true
    );
CREATE POLICY "anyone_can_view_avatar_bucket_objects_rls_policy"
    on storage.objects FOR SELECT USING (bucket_id = 'avatars');
END;