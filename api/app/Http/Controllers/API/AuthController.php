<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'username' => 'required|unique:users',
            'password' => 'required|min:6',
            'c_password' => 'required|same:password',
        ], [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Invalid email address',
            'username.required' => 'Username is required',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 6 characters',
            'c_password.required' => 'Confirm password is required',
            'c_password.same' => 'Password and confirm password must match',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 401);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role' => 'user',
            'profile_photo_url' => 'assets/image/user/',
        ]);
        $user['created_by'] = $user->id;
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'success'       => true,
            'message'       => $user->name . ' User created successfully.',
            'data'          => $user,
            'access_token'  => $token,
            'token_type'    => 'Bearer'
        ]);
    }
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'User not found'
            ], 401);
        }
        $user   = User::where('email', $request->email)->firstOrFail();
        $token  = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message'       => 'Login success',
            'data'          => $user,
            'access_token'  => $token,
            'token_type'    => 'Bearer'
        ]);
    }
    public function user($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 401);
        }
        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User email and password not found'
            ], 401);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'username' => 'required|unique:users,username,' . $user->id,
            'old_password' => 'nullable|min:3',
            'old_email' => 'nullable|email|unique:users,email,' . $user->id,
            'old_username' => 'nullable|unique:users,username,' . $user->id,
            'password' => 'nullable|min:6',
            'c_password' => 'nullable|same:password',
            'profile_photo_path' => 'nullable|mimes:jpg,jpeg,png|max:2048',
            'profile_photo_url' => 'nullable',
        ], [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Invalid email address',
            'username.required' => 'Username is required',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 6 characters',
            'c_password.required' => 'Confirm password is required',
            'c_password.same' => 'Password and confirm password must match',
            'profile_photo_path.mimes' => 'Profile photo must be a file of type: jpg, jpeg, png',
            'profile_photo_path.max' => 'Profile photo must not be greater than 2MB',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 401);
        }
        if ($request->has('old_password')) {
            if (!Hash::check($request->input('old_password'), $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid old password'
                ], 401);
            }
        }
        if ($request->has('old_email')) {
            if ($request->input('old_email') != $user->email) {
                if (User::where('email', $request->input('old_email'))->exists()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Email already exists'
                    ], 401);
                }
            }
        }
        if ($request->has('old_username')) {
            if ($request->input('old_username') != $user->username) {
                if (User::where('username', $request->input('old_username'))->exists()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Username already exists'
                    ], 401);
                }
            }
        }

        $user =  User::where('id', $user->id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'profile_photo_path' => $request->profile_photo_path,
            'profile_photo_url' => 'assets/image/user/',
            'role' => 'user',
            'updated_by' => Auth::user()->id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
        ]);
    }
    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'Logout success'
        ]);
    }
}
