'use client'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'

const ButtonAuth = ({ label, loading }: { label: string, loading: boolean }) => {
    return (
        <Button className="w-full" disabled={loading}>
            {loading ? (
                <span className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <span>{label}</span>
            )}
        </Button>
    );
};

export default ButtonAuth;